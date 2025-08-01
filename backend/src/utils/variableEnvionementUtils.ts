import type { VariableEnvListeType } from "../types/variableEnv";

export function getVariableEnv(variable: VariableEnvListeType): string {
    // récupère la variable d'environnement avec le nom passé en paramètre
    const value = process.env[variable];

    // si la variable n'existe pas, lance une erreur
    if (!value) {
        throw new Error(`Variable d'environnement manquante : ${variable}`);
    }

    // retourne la valeur de la variable d'environnement
    return value;
}