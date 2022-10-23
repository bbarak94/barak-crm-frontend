
export function setLoadingOn() {
   return (dispatch) => {
       dispatch({
           type: 'LOADING_START'
       })
   }
}
export function setLoadingOff() {
   return (dispatch) => {
       dispatch({
           type: 'LOADING_DONE'
       })
   }
}
