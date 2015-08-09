class GenericState
  constructor: (@id,@enteringConditions,@loopFunction) ->


  executeState:(callback)->
    @loopFunction()
    callback()

  testState: -> @enteringConditions()