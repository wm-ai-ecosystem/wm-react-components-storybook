import { get, template, isString } from "lodash-es";

export const getObjValueByKey = (obj: any, strKey: string): any => {
  if (!strKey || !obj) {
    return obj;
  }
  return get(obj, strKey);
};

export const checkIsCustomPipeExpression = function (exp) {
  let customRegEx = /(custom(\s*:))/g;
  let matches = exp.match(customRegEx);
  return matches && matches.length;
};

export const getEvaluatedData = (dataObj: any, options: any, context?: any): any => {
  let displayExpr = options.expression;
  if (displayExpr) {
    if (typeof displayExpr !== "function") {
      return dataObj[displayExpr];
    }
    return displayExpr(dataObj);
  }

  let expressionValue = "";
  const field = options.field || "",
    expr = options.expression,
    bindExpr = options.bindExpression;

  if (bindExpr) {
    expressionValue = bindExpr.replace("bind:", "");

    if (checkIsCustomPipeExpression(expressionValue)) {
      expressionValue = expressionValue + ": __1";
    }
    expressionValue = getUpdatedExpr(expressionValue);
  } else {
    expressionValue = expr ? expr : field;
  }

  if (!bindExpr && !expr) {
    if (typeof field === "function") {
      return field(dataObj);
    }
    return get(dataObj, field);
  }

  return expressionValue(context, Object.assign({}, dataObj, { __1: dataObj }));
};

const getUpdatedExpr = (expr: string) => {
  let updated = "",
    ch,
    next,
    i,
    j,
    matchCh,
    matchCount,
    isQuotedStr,
    subStr,
    isQuotedStrEvaluated;

  expr = expr.replace(/\$\[data\[\$i\]/g, "$[__1");

  for (i = 0; i < expr.length; i++) {
    ch = expr[i];
    next = expr[i + 1];
    if (ch === "$" && next === "[") {
      matchCount = 1;
      isQuotedStrEvaluated = false;
      isQuotedStr = false;

      for (j = i + 2; j < expr.length; j++) {
        matchCh = expr[j];

        if (matchCh === " ") {
          continue;
        }

        if (!isQuotedStrEvaluated) {
          isQuotedStr = expr[j] === '"' || expr[j] === "'";
          isQuotedStrEvaluated = true;
        }

        if (matchCh === "[") {
          matchCount++;
        } else if (matchCh === "]") {
          matchCount--;
        }

        if (!matchCount) {
          subStr = expr.substring(i + 2, j);
          if (isQuotedStr) {
            updated += "__1[" + subStr + "]";
          } else {
            updated += subStr;
          }

          break;
        }
      }
      i = j;
    } else {
      updated += ch;
    }
  }

  return updated;
};
