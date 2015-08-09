
class StateMachine

	constructor: (@stateList)->
		@currentState = @stateList[0]

	selectNextState: ->
		@currentState = @currentState.testForNextState()

	executeCurrentState:->
		@currentState.execute()
		@selectNextState()



class State

	constructor: (@id,@name,@enteringConditions,@executeFunction,@actionList)->

	executeState:(callback)->
    	@loopFunction()
    	callback?()

	testForNextState:->
		for action in @actionList
			if action.testCondition()
				return action.nextState

	execute:->
		@executeFunction()

class StateAction
	constructor:(@testCondition,@nextState)->