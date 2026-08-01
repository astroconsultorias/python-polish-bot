import { execFileSync } from "node:child_process";

const allowedAdvisory = "GHSA-qwww-vcr4-c8h2";
const allowedPackages = new Set(["react-router", "react-router-dom"]);

let report;

try {
  const output = execFileSync(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["audit", "--omit=dev", "--json"],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  report = JSON.parse(output);
} catch (error) {
  const output = error?.stdout?.toString?.() ?? "";
  if (!output) {
    console.error("Não foi possível executar a auditoria de dependências.");
    process.exit(1);
  }
  report = JSON.parse(output);
}

const vulnerabilities = Object.entries(report.vulnerabilities ?? {});

if (vulnerabilities.length === 0) {
  console.log("Auditoria de produção aprovada: nenhuma vulnerabilidade encontrada.");
  process.exit(0);
}

const disallowed = vulnerabilities.filter(([packageName, vulnerability]) => {
  if (!allowedPackages.has(packageName)) return true;

  return (vulnerability.via ?? []).some((item) => {
    if (typeof item === "string") {
      return !allowedPackages.has(item);
    }

    const reference = `${item.url ?? ""} ${item.title ?? ""}`;
    return !reference.includes(allowedAdvisory);
  });
});

if (disallowed.length > 0) {
  console.error("Auditoria reprovada. Vulnerabilidades não autorizadas:");
  for (const [packageName, vulnerability] of disallowed) {
    console.error(`- ${packageName}: ${vulnerability.severity}`);
  }
  process.exit(1);
}

console.warn(
  `Auditoria aprovada com exceção documentada: ${allowedAdvisory}. ` +
    "A aplicação usa BrowserRouter em modo SPA e não utiliza APIs RSC instáveis.",
);
