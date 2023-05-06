import { dispatch } from './dispatcher'

type Rule = string | RegExp | ((url: string) => RuleMatch)
type RuleMatch = { isMatching: boolean, params: any[] }
type Handler = string | ((...args: any[]) => void)

type RouteHandler = {
  rule: Rule,
  handler: Handler,
  view: React.ComponentType<{ state: any }>,
}

class Router {
  private handlers: RouteHandler[]

  public constructor() {
    this.handlers = []
  }

  /**
   * Register a routing rule to this router.
   *
   * Note that the order in which the rule is registered matters. Rule that is
   * registered first will be prioritized.
   */
  public register(rule: Rule, handler: Handler, view: React.ComponentType<{ state: any }>) {
    this.handlers.push({ rule, handler, view })
  }

  /**
   * Execute the handler for the given url.
   */
  public route(url: string) {
    console.debug('route url:', url)
    for (var ruleHandler of this.handlers) {
      const { isMatching, params } = this.match(url, ruleHandler.rule)
      if (isMatching) {
        console.debug("Executing ruleHandler:", ruleHandler, "params:", params)
        this.execute(ruleHandler.handler, params)
        return
      }
    }
    console.log('No matching handler found for URL:', url)
  }

  /**
   * Check if url has a registered handler
   */
  public valid(url: string) {
    for (var ruleHandler of this.handlers) {
      const { isMatching } = this.match(url, ruleHandler.rule)
      if (isMatching) {
        return true
      }
    }
    return false
  }

  public view(url: string) {
    for (var ruleHandler of this.handlers) {
      const { isMatching } = this.match(url, ruleHandler.rule)
      if (isMatching) {
        return ruleHandler.view
      }
    }
    return null
  }

  /**
   * Check if url match the given rule.
   */
  private match(url: string, rule: Rule) {
    if (typeof(rule) == 'string') {
      return { isMatching: url == rule, params: [] }
    } else if (rule instanceof RegExp) {
      const match = url.match(rule)
      if (match) {
        return { isMatching: true, params: match.slice(1) }
      } else {
        return { isMatching: false, params: [] }
      }
    } else {
      return rule(url)
    }
  }

  private execute(handler: Handler, params: any[]) {
    if (typeof(handler) == 'string') {
      dispatch(handler, ...params)
    } else {
      handler(...params)
    }
  }
}

export default Router
