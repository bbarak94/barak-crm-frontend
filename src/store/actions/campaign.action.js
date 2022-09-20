import { campaignService } from '../../services/campaign.service.js'


export function getActionSetCampaigns(campaigns) {
    return {
        type: 'SET_CAMPAIGNS',
        campaigns,
    }
}
export function getActionSetCampaign(campaign) {
    return {
        type: 'SET_CAMPAIGN',
        campaign,
    }
}
export function getActionRemoveCampaign(campaignId) {
    return {
        type: 'REMOVE_CAMPAIGN',
        campaignId,
    }
}
export function getActionAddCampaign(campaign) {
    return {
        type: 'ADD_CAMPAIGN',
        campaign,
    }
}
export function getActionUpdateCampaign(campaign) {
    return {
        type: 'UPDATE_CAMPAIGN',
        campaign,
    }
}


export function loadCampaigns(userId) {
    return async (dispatch) => {
        try {
            const campaigns = await campaignService.query(userId)
            dispatch(getActionSetCampaigns(campaigns))
            return campaigns
        } catch {
            throw new Error('Could not load campaigns')
        }
    }
}

export function getCampaign(campaignId) {
    return async (dispatch) => {
        try {
            const campaign = await campaignService.getById(campaignId)
            dispatch(getActionSetCampaign(campaign))
        } catch {
            throw new Error('Could not load campaigns')
        }
    }
}

export function removeCampaign(campaignId) {
    return async (dispatch) => {
        try {
            await campaignService.remove(campaignId)
            dispatch(getActionRemoveCampaign(campaignId))
        } catch {
            throw new Error('Could not remove campaign')
        }
    }
}

export function saveCampaign(campaign) {
    return async (dispatch) => {
        const actionType = campaign._id ? 'UPDATE_CAMPAIGN' : 'ADD_CAMPAIGN'
        try {
            dispatch({ type: actionType, campaign })
            const savedCampaign = await campaignService.save(campaign)
            return savedCampaign
        } catch (err) {
            console.log('Cannot save campaign', err)
        }
    }
}

export function setCampaign(campaignId) {
    return async (dispatch) => {
        try {
            const campaign = await campaignService.getById(campaignId)
            dispatch(getActionSetCampaign(campaign))
        } catch (err) {
            console.log('Cannot set campaign', err)
        }
    }
}


