import { leadService } from '../../services/lead.service.js'


export function getActionSetLeads(leads) {
    return {
        type: 'SET_LEADS',
        leads,
    }
}
export function getActionSetLead(lead) {
    return {
        type: 'SET_LEAD',
        lead,
    }
}
export function getActionRemoveLead(leadId) {
    return {
        type: 'REMOVE_LEAD',
        leadId,
    }
}
export function getActionAddLead(lead) {
    return {
        type: 'ADD_LEAD',
        lead,
    }
}
export function getActionUpdateLead(lead) {
    return {
        type: 'UPDATE_LEAD',
        lead,
    }
}


export function loadLeads(userId) {
    return async (dispatch) => {
        try {
            const leads = await leadService.query(userId)
            dispatch(getActionSetLeads(leads))
            return leads
        } catch {
            throw new Error('Could not load leads')
        }
    }
}

export function getLead(leadId) {
    return async (dispatch) => {
        try {
            const lead = await leadService.getById(leadId)
            dispatch(getActionSetLead(lead))
        } catch {
            throw new Error('Could not load leads')
        }
    }
}

export function removeLead(leadId) {
    return async (dispatch) => {
        try {
            await leadService.remove(leadId)
            dispatch(getActionRemoveLead(leadId))
        } catch {
            throw new Error('Could not remove lead')
        }
    }
}

export function saveLead(lead) {
    return async (dispatch) => {
        const actionType = lead._id ? 'UPDATE_LEAD' : 'ADD_LEAD'
        try {
            dispatch({ type: actionType, lead })
            const savedLead = await leadService.save(lead)
            return savedLead
        } catch (err) {
            console.log('Cannot save lead', err)
        }
    }
}

export function setLead(leadId) {
    return async (dispatch) => {
        try {
            const lead = await leadService.getById(leadId)
            dispatch(getActionSetLead(lead))
        } catch (err) {
            console.log('Cannot set lead', err)
        }
    }
}


