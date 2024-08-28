import React from 'react';

function SystemSettings() {
    return (
        <div className="col-lg-3">
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">System Settings</h5>
                    <p className="card-text">Configure system-wide settings.</p>
                    <a id='user' className="btn btn-primary">Go to System Settings</a>
                </div>
            </div>
        </div>
    );
}

export default SystemSettings;
