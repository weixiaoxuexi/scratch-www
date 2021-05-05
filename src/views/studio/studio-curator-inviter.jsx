/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {inviteCurator} from './lib/studio-member-actions';

const StudioCuratorInviter = ({onSubmit}) => {
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div className="studio-adder-section">
            <h3>✦ Invite Curators</h3>
            <input
                disabled={submitting}
                type="text"
                placeholder="<username>"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button
                className={classNames('button', {
                    'mod-mutating': submitting
                })}
                disabled={submitting}
                onClick={() => {
                    setSubmitting(true);
                    setError(null);
                    onSubmit(value)
                        .then(() => setValue(''))
                        .catch(e => setError(e))
                        .then(() => setSubmitting(false));
                }}
            >Invite</button>
            {error && <div>{error}</div>}
        </div>
    );
};

StudioCuratorInviter.propTypes = {
    onSubmit: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
    onSubmit: inviteCurator
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioCuratorInviter);
