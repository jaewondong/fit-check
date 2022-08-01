import React from 'react';

const Expire = (props) => {
    const [isVisible, setIsVisible] = useState(props.);
    const [message, setMessage] = useState(props.message)

    useEffect(() =>
    {
        setMessage(props.message)
        setIsVisible(true)
        setTimer(props.delay);
    }, [props.children]);


    const setTimer = (delay) =>
    {
        setTimeout(() => setIsVisible(false), delay);
    };

    return (
        isVisible
            ? <div>{children}</div>
            : <span />
    );
}

export default Expire