import { channelService } from '../../services/channel.service.js'


export function getActionSetChannels(channels) {
    return {
        type: 'SET_CHANNELS',
        channels,
    }
}
export function getActionSetChannel(channel) {
    return {
        type: 'SET_CHANNEL',
        channel,
    }
}
export function getActionRemoveChannel(channelId) {
    return {
        type: 'REMOVE_CHANNEL',
        channelId,
    }
}
export function getActionAddChannel(channel) {
    return {
        type: 'ADD_CHANNEL',
        channel,
    }
}
export function getActionUpdateChannel(channel) {
    return {
        type: 'UPDATE_CHANNEL',
        channel,
    }
}


export function loadChannels(userId) {
    return async (dispatch) => {
        try {
            const channels = await channelService.query(userId)
            dispatch(getActionSetChannels(channels))
            return channels
        } catch {
            throw new Error('Could not load channels')
        }
    }
}

export function getChannel(channelId) {
    return async (dispatch) => {
        try {
            const channel = await channelService.getById(channelId)
            dispatch(getActionSetChannel(channel))
        } catch {
            throw new Error('Could not load channels')
        }
    }
}

export function removeChannel(channelId) {
    return async (dispatch) => {
        try {
            await channelService.remove(channelId)
            dispatch(getActionRemoveChannel(channelId))
        } catch {
            throw new Error('Could not remove channel')
        }
    }
}

export function saveChannel(channel) {
    return async (dispatch) => {
        const actionType = channel._id ? 'UPDATE_CHANNEL' : 'ADD_CHANNEL'
        try {
            dispatch({ type: actionType, channel })
            const savedChannel = await channelService.save(channel)
            return savedChannel
        } catch (err) {
            console.log('Cannot save channel', err)
        }
    }
}

export function setChannel(channelId) {
    return async (dispatch) => {
        try {
            const channel = await channelService.getById(channelId)
            dispatch(getActionSetChannel(channel))
        } catch (err) {
            console.log('Cannot set channel', err)
        }
    }
}


