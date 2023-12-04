export default (state, action) => {
    switch (action.type) {
        case "ADD_TO_ARRAY":
            return {
                todoList: [
                    ...state.todoList,
                    {
                        id: state.todoList.length + 1,
                        task: action.payload,
                        complete: false,
                        editing: false
                    }
                ],
                containerColor: state.containerColor
            };

        case "DELETE_TO_CARD":
            return {
                ...state.todoList,
                containerColor: state.containerColor,
                todoList: state.todoList.filter((item) => item !== action.payload)
            };

        case "DELETE_TO_ALL_CARD":
            return {
                ...state.todoList,
                todoList: [],
                containerColor: state.containerColor
            };
            
        case "CHANGE_BG_COLOR":
            return {
                ...state.todoList,
                todoList: state.todoList,
                containerColor: action.payload
            };


        default:
            return state;
    }
}