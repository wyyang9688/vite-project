import { config } from "dotenv";
import { join } from "node:path";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const rootResolve = (...pathSegments) => join(__dirname, "..", ...pathSegments);

export const getEnv = () => argv["m"] ?? process.env.PROJECTENV;
const getEnvPath = () => {
    if (
        String(typeof getEnv()) === "boolean" ||
        String(typeof getEnv()) === "undefined"
    ) {
        return rootResolve("env/.env");
    }
    return rootResolve(`env/.env.${getEnv()}`);
};
export const getConfig = () => config({ path: getEnvPath() }).parsed;
