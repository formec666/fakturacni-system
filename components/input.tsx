
import PropTypes from 'prop-types'
import React, { Component, useState } from 'react'

export const Input = (props:{
    label: string,
    value?:any
    onChange?: any
    type?: string,
    props?: any
}) => {
    return (
    <div className='flex flex-col justify-start items-start p-2'>
        <label className='text-lg'>{props.label}</label>
        <span className="">
            {props.type=='textarea'?
            <textarea
            cols={50}
            rows={4}
            className="border border-md border-double text-lg p-4 rounded-sm hover:scale-105 hover:shadow-md hover:border-primary-400 focus:border-double focus:border-4 focus:shadow-md  focus:border-primary-400 focus:outline-none focus:scale-100  transition-all duration:200 ease-out"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            {...props.props}
            />
            :
            <input
                className="border border-md border-double text-lg p-4 rounded-sm hover:scale-105 hover:shadow-md hover:border-primary-400 focus:border-double focus:border-4 focus:shadow-md  focus:border-primary-400 focus:outline-none focus:scale-100  bg-gray-200 transition-all duration:200 ease-out"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                type={props.type||'text'}
                {...props.props}
            />}
            
        </span>
    </div>
    )
}