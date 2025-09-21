export default (posts =[],action)=>{
    switch(action.type){
        case'FETCH_ALL':
            return action.type;
        case 'CREATE':
            return posts;
        default:
            return posts;
    }
}