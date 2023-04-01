import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
const DonePayment = dynamic(() => import('../../app/Payment/DonePayment'), { ssr: false });
const FailPayment = dynamic(() => import('../../app/Payment/FailPayment'), { ssr: false });
const StatusPayment = () => {
  const router: any = useRouter();
  const { query } = router;
  console.log(query);
  return (
    <div className='done-payment'>
      {query.status === 'done' ? <DonePayment /> : <FailPayment />}
    </div>
  );
};

export default StatusPayment;
