import React, { useState, useEffect } from 'react';

import '../stylesheets/Dropdown.css';

function Dropdown ({options, placeholder, onChange}) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState(placeholder);

    //Generates a unique key for each outfit.
    const generateKey = (data) => {
        return `${ data }_${ new Date().getTime() }`;
    }
    //Handles opening and closing of dropdown on click.
    const showDropdown = () => {
        setOpen(!open);
    }

    //Handles the user's click on the option.
    const handleClick = (item) => {
        setTitle(item.label);
        onChange(item);
        showDropdown();
    }

    useEffect(() => {
        const setData = () => {
            if (options == null) {
                setItems([]);
            } else {
                setItems(options);
            }
        }
        console.log(options);
        setData();
    }, [options]);

    return (
        <div className="dropdown">
            <div className='dd-header' role="button" onClick={showDropdown}>
                <p className='dd-title'>{title} ▾</p>
                {open? 
                    <ul className="dd-list">
                        {items.map(item => (
                            <li className="dd-list-item" key={generateKey(item.label)}>
                            <button type="button" onClick={() => handleClick(item)}>
                                <p>{item.label}</p>
                            </button>
                            </li>
                        ))}
                    </ul>
                    :
                    null
                }
            </div>

        </div>
    )
}

export default Dropdown;