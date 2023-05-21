import FireBaseMessagingLayout from 'components/fcm';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { User } from 'type/user';
const DonePayment = dynamic(() => import('../../app/Payment/DonePayment'), { ssr: false });
const FailPayment = dynamic(() => import('../../app/Payment/FailPayment'), { ssr: false });

interface Props {
  user: User;
}

const StatusPayment = ({ user }: Props) => {
  const router: any = useRouter();
  const { query } = router;
  return (
    <FireBaseMessagingLayout user={user}>
      <div className='done-payment'>
        {query.status === 'done' ? <DonePayment /> : <FailPayment />}
      </div>
    </FireBaseMessagingLayout>
  );
};

export default StatusPayment;
