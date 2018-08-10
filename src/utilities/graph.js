/**
 * Graph utility class
 * 
 * input example:
 * 
 * links = [
 *   { source: "A", target: "B", weight: 1 },
 *   { source: "A", target: "C", weight: 4 },
 *   { source: "A", target: "D", weight: 10 },
 *   { source: "B", target: "E", weight: 3 },
 *   { source: "C", target: "D", weight: 4 },
 *   { source: "C", target: "F", weight: 2 },
 *   { source: "D", target: "E", weight: 1 },
 *   { source: "E", target: "B", weight: 3 },
 *   { source: "E", target: "A", weight: 2 },
 *   { source: "F", target: "D", weight: 1 }
 * ];
 * 
 * nodes = [
 *   { id: "A" },
 *   { id: "B" },
 *   { id: "C" },
 *   { id: "D" },
 *   { id: "E" },
 *   { id: "F" }
 * ];
 * 
 * @class GraphApi
 */
class GraphApi {
  constructor(nodes, links) {
    this.nodes = nodes;
    this.links = links;
  }
  
  /**
   * Get routes from string
   * 
   * @param {sting} route 
   * @returns {array} routes
   * 
   * @memberOf GraphApi
   */
  getRoutes(route) {
    const nodeArr = route.split("-");

    if (nodeArr.length === 1) return false;

    const routes  = [];

    let nodeCounter = 0;
    nodeArr.forEach( (node, index, arr) => {
      nodeCounter++;

      if ( (nodeCounter === 2 && index < 2) || (nodeCounter === 1 && index > 1) ) {
        nodeCounter = 0;
        
        routes.push({ source: arr[index - 1], target: node });
      }       
    });

    return routes;
  }

  /**
   * Calculate the delivery cost of the given delivery route
   * 
   * @param {string} route 
   * @returns {number} cost
   * 
   * @memberOf GraphApi
   */
  deliveryCost(route) {
    const routes = this.getRoutes(route);
    
    if (!routes) return "No Such Route";

    const cost = routes.reduce( ( initCost, currentRoute) => {
      return this.links.reduce( (initLinkCost, link) => {
        return currentRoute.source === link.source && currentRoute.target === link.target ? initCost + link.weight : initLinkCost;
      }, 0);      
    }, 0 )

    return cost === 0 ? "No Such Route" : cost;
  }
}

export default GraphApi;