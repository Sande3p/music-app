/**
 * get common controller service
 * @param service the service
 */
function getControllerMethods (service) {
  /**
   * get entity by id
   * @param req the http request
   * @param res the http response
   */
  async function get (req, res, isCsv) {
    const result = await service.get(req.params.id, req.query)
    res.send(result)
  }

  /**
   * search entities by request query
   * @param req the http request
   * @param res the http response
   */
  async function search (req, res) {
    const result = await service.search(req.query)
    res.send(result.result)
  }

  return {
    search,
    get
  }
}

module.exports = { getControllerMethods }
