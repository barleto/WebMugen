
class StateMachine

	constructor: (@stateList)->
		@currentState = @stateList[0]
		@currentState.onEnter?()

	selectNextState: ->
		@currentState.onExit?()
		@currentState = @currentState.testForNextState()
		@currentState.onEnter?()

	executeCurrentState:->
		@currentState.execute()
		@selectNextState()

	reset:->
		@currentState = @stateList[0]



class State

	constructor: (@id,@name,@executeFunction,@actionList)->

	executeState:(callback)->
    	@loopFunction()
    	callback?()

	testForNextState:->
		for action in @actionList
			if action.testCondition()
				return action.nextState
		return this

	execute:->
		@executeFunction()

	onEnter:null

	onExit:null

class StateAction
	constructor:(@testCondition,@nextState)->
