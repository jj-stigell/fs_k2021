import React from 'react'

const Errors = ({ errors }) => {
    if (errors === null) {
        return null
    }

    if (errors.errors.name && errors.errors.number) {
        return (
            <div>
                <div className={errors.type}>
                    {errors.errors.name.message}
                </div>
                <div className={errors.type}>
                    {errors.errors.number.message}
                </div>
            </div>
          )
    } else if (errors.errors.name) {
        return (
            <div className={errors.type}>
                {errors.errors.name.message}
            </div>
          )
    } else if (errors.errors.number) {
        return (
            <div className={errors.type}>
                {errors.errors.number.message}
            </div>
          )
    }
}

export default Errors
