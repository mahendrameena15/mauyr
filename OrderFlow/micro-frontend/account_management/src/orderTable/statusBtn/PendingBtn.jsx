import React from 'react'

function PendingBtn() {
    return (
        <>
            <div className="flex justify-center items-center gap-1 radius-30 bg-custom-yellow h-7	 w-min	px-3">
                <div className="dot bg-custom-darkYellow rounded-full	" />
                <p className="text-yellow font-medium	text-sm	">Pending</p>
            </div>
        </>
    )
}

export default PendingBtn
