
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
// import { MdAdminPanelSettings } from 'react-icons/md';

const links = [

    {
        id: 1,
        text: 'stats',
        path: '/',
        icon: <IoBarChartSharp />,
    }, {
        id: 2,
        text: 'add job',
        path: 'add-job',
        icon: <FaWpforms />,
    },
    {
        id: 3,
        text: 'all jobs',
        path: 'all-jobs',
        icon: <MdQueryStats />,
    },
    {
        id: 4,
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />,
    },
    //   {
    //     text: 'admin',
    //     path: 'admin',
    //     icon: <MdAdminPanelSettings />,
    //   },
];

export default links;
