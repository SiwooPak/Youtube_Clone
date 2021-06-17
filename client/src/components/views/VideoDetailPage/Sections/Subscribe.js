import Reac, { useEffect } from 'react';
import Axios from 'axios';
import { response } from 'express';

function Subscribe({userTo}) {

    const [SubscribeNum, setsSubscribeNum] = useState(0);
    const [IsSubscribed, setIsSubscribed] = useState(false);
        
    useEffect(() => {
        
        let variable = { userTo: userTo }

        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response => {
            if(response.data.success) {
                setsSubscribeNum(response.data.subscribeNumber);
            } else {
                alert('구독자 수의 정보를 가져오지 못했습니다.');
            }
        })
        let subscribeVar = { userTo: userTo, userFrom: localStorage.getItem('userId')}

        Axios.post('/api/subscribe/subscribed', subscribeVar)
        .then(resoponse => {
            if(response.data.success) {
                setIsSubsribed(response.data.IsSubscribed);
            } else {
                alert('구독자의 정보를 가져오지 못했습니다.');
            }
        })

    },[])

    return (
        <div>
            <button style={{
                backgroundColor: `${IsSubscribed ? '#CC0000': '#AAAAAA'}`, borderRadius: '4px',
                color: 'white', padding: '10px 16px',
                fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick
            >
                {SubscribeNum} {IsSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
