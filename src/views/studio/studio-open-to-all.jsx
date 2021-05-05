/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectStudioOpenToAll, selectIsFetchingInfo} from '../../redux/studio';
import {
    mutateStudioOpenToAll, selectIsMutatingOpenToAll, selectOpenToAllMutationError
} from '../../redux/studio-mutations';

const StudioOpenToAll = ({
    openToAllError, isFetching, isMutating, openToAll, handleUpdate
}) => (
    <div>
        {isFetching ? (
            <h4>Fetching...</h4>
        ) : (
            <div>
                <label>
                    <input
                        disabled={isMutating}
                        type="checkbox"
                        checked={openToAll}
                        onChange={e => handleUpdate(e.target.checked)}
                    />
                    <span>{openToAll ? 'Open to all' : 'Not open to all'}</span>
                    {openToAllError && <div>Error mutating openToAll: {openToAllError}</div>}
                </label>
            </div>
        )}
    </div>
);

StudioOpenToAll.propTypes = {
    openToAllError: PropTypes.string,
    isFetching: PropTypes.bool,
    isMutating: PropTypes.bool,
    openToAll: PropTypes.bool,
    handleUpdate: PropTypes.func
};

export default connect(
    state => ({
        openToAll: selectStudioOpenToAll(state),
        isFetching: selectIsFetchingInfo(state),
        isMutating: selectIsMutatingOpenToAll(state),
        openToAllError: selectOpenToAllMutationError(state)
    }),
    {
        handleUpdate: mutateStudioOpenToAll
    }
)(StudioOpenToAll);
