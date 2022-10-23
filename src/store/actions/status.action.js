import { statusService } from '../../services/status.service.js'


export function getActionSetStatuses(statuses) {
    return {
        type: 'SET_STATUSES',
        statuses,
    }
}
export function getActionSetStatus(status) {
    return {
        type: 'SET_STATUS',
        status,
    }
}
export function getActionRemoveStatus(statusId) {
    return {
        type: 'REMOVE_STATUS',
        statusId,
    }
}
export function getActionAddStatus(status) {
    return {
        type: 'ADD_STATUS',
        status,
    }
}
export function getActionUpdateStatus(status) {
    return {
        type: 'UPDATE_STATUS',
        status,
    }
}


export function loadStatuses(userId) {
    
    return async (dispatch) => {
        try {
            const statuses = await statusService.query(userId)
            dispatch(getActionSetStatuses(statuses))
            return statuses
        } catch {
            throw new Error('Could not load statuses')
        }
    }
}

export function getStatus(statusId) {
    return async (dispatch) => {
        try {
            const status = await statusService.getById(statusId)
            dispatch(getActionSetStatus(status))
        } catch {
            throw new Error('Could not load statuses')
        }
    }
}

export function removeStatus(statusId) {
    return async (dispatch) => {
        try {
            await statusService.remove(statusId)
            dispatch(getActionRemoveStatus(statusId))
        } catch {
            throw new Error('Could not remove status')
        }
    }
}

export function saveStatus(status) {
    return async (dispatch) => {
        const actionType = status._id ? 'UPDATE_STATUS' : 'ADD_STATUS'
        try {
            dispatch({ type: actionType, status })
            const savedStatus = await statusService.save(status)
            return savedStatus
        } catch (err) {
            console.log('Cannot save status', err)
        }
    }
}

export function setStatus(statusId) {
    return async (dispatch) => {
        try {
            const status = await statusService.getById(statusId)
            dispatch(getActionSetStatus(status))
        } catch (err) {
            console.log('Cannot set status', err)
        }
    }
}


