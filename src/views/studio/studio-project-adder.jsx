/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {addProject} from './lib/studio-project-actions';

const StudioProjectAdder = ({onSubmit}) => {
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div className="studio-adder-section">
            <h3>✦ Add Projects</h3>
            <input
                disabled={submitting}
                type="text"
                placeholder="<project id>"
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
            >Add</button>
            {error && <div>{error}</div>}
        </div>
    );
};

StudioProjectAdder.propTypes = {
    onSubmit: PropTypes.func
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({
    onSubmit: addProject
});

export default connect(mapStateToProps, mapDispatchToProps)(StudioProjectAdder);
