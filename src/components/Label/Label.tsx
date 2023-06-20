import React from 'react';

function Label({ label }: { label: string }) {
    return (
        <div
            className={`whitespace-nowrap px-1 text-xs text-white font-medium bg-sky-600 rounded-sm text-center`}
        >
            {label}
        </div>
    );
}

export default Label;
