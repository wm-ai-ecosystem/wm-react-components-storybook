import { replace } from "../util";
import { Formatter } from "./types";

export class PrependFormatter implements Formatter {
  public format(input: any, prefix: string): string {
    return (prefix || "") + (input !== null || input != undefined ? input : "");
  }
}

export class AppendFormatter implements Formatter {
  public format(input: any, suffix: string): string {
    return (input !== null || input != undefined ? input : "") + (suffix || "");
  }
}

export class TemplateReplaceFormatter implements Formatter {
  public format(template: string, replacements: Record<string, any> | any[]): string {
    if (!template) return template;

    try {
      return replace(template, replacements) || "";
    } catch (error) {
      console.error("Template replacement failed:", error);
      return template; // Return original template if replacement fails
    }
  }
}
