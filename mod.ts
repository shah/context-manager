import {
  InflectableValue,
  snakeCaseValue,
} from "https://cdn.jsdelivr.net/gh/shah/text-inflect@v1.0.0/mod.ts";

export interface Context {
  readonly isContext: true;
  readonly execEnvs: ExecutionEnvironments;
}

export function isContext(o: object): o is Context {
  return "isContext" in o;
}

export interface ProjectContext extends Context {
  readonly isProjectContext: true;
  readonly projectPath: string;
}

export function isProjectContext(o: object): o is ProjectContext {
  return "isProjectContext" in o;
}

export type SemanticVersion = string;

export interface Revision {
  readonly version: SemanticVersion;
}

export interface ExecutionEnvironment {
  isExecutionEnvironment: true;
  environmentName: InflectableValue;
}

export interface ExecutionEnvironments {
  isExecutionEnvironments: true;
  environmentsName: InflectableValue;
}

export interface AllExecutionEnvironments extends ExecutionEnvironments {
  isAllExecutionEnvironments: true;
}

export interface SomeExecutionEnvironments extends ExecutionEnvironments {
  isSomeExecutionEnvironments: true;
  environments: ExecutionEnvironment[];
}

export interface EngineeringEnvironment extends ExecutionEnvironment {
  isEngineeringEnvironment: true;
  isDevlSandboxEnvironment?: boolean; // a single developer's sandbox
  isDevlIntegrationEnvironment?: boolean; // multiple developers' integrated work env
  isTestEnvironment?: boolean; // for QA or other test purposes
}

export interface DemonstrationEnvironment extends ExecutionEnvironment {
  isDemonstrationEnvironment: true;
}

export interface ProductionEnvironment extends ExecutionEnvironment {
  isProductionEnvironment: true;
  isStagingEnvironment: boolean;
}

export function isExecutionEnvironment(o: any): o is ExecutionEnvironment {
  return "isExecutionEnvironment" in o;
}

export function isExecutionEnvironments(o: any): o is ExecutionEnvironments {
  return "isExecutionEnvironments" in o;
}

export function isAllExecutionEnvironments(
  o: any,
): o is AllExecutionEnvironments {
  return "isAllExecutionEnvironments" in o;
}

export function isSomeExecutionEnvironments(
  o: any,
): o is SomeExecutionEnvironments {
  return "isSomeExecutionEnvironments" in o;
}

export const ctxFactory = new (class {
  #testEngineering: EngineeringEnvironment = {
    isExecutionEnvironment: true,
    isEngineeringEnvironment: true,
    isDevlSandboxEnvironment: true,
    isDevlIntegrationEnvironment: true,
    isTestEnvironment: true,
    environmentName: snakeCaseValue("test_engineering"),
  };

  readonly envAll: AllExecutionEnvironments = {
    isExecutionEnvironments: true,
    isAllExecutionEnvironments: true,
    environmentsName: snakeCaseValue("all"),
  };
  readonly envTest: SomeExecutionEnvironments = {
    isExecutionEnvironments: true,
    isSomeExecutionEnvironments: true,
    environmentsName: snakeCaseValue("test"),
    environments: [this.#testEngineering],
  };
  readonly envTODO: ExecutionEnvironments = {
    isExecutionEnvironments: true,
    environmentsName: snakeCaseValue("TODO"),
  };
  readonly productionEnv: ExecutionEnvironment = {
    isExecutionEnvironment: true,
    environmentName: snakeCaseValue("production"),
  };

  public context(ee?: ExecutionEnvironments): Context {
    return {
      isContext: true,
      execEnvs: ee ? ee : this.envTODO,
    };
  }

  public projectContext(
    projectPath: string,
    ee?: ExecutionEnvironments,
  ): ProjectContext {
    return {
      isContext: true,
      isProjectContext: true,
      projectPath: projectPath,
      execEnvs: ee ? ee : this.envTODO,
    };
  }

  public defaultRevision(): Revision {
    return { version: "1.0.0" };
  }
})();
