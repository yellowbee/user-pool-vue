import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthHandler from '../components/AuthHandler';
import ImageList from '../components/ImageList';
import UploadForm from '../components/UploadForm';
import CategorizedSearch from '../components/search/CategorizedSearch';
import Me from '../components/me/Me';
import HowTo from '../components/me/HowTo';
import Tasks from '../components/tasks/Tasks';
import Testees from '../components/search/Testees';
import Signin from '../components/me/Signin';
import Signup from '../components/me/Signup';
import NewTask from '../components/tasks/NewTask';
import QRcode from '../components/me/QRcode';
import Terms from '../components/me/Terms';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/search'
        },
        {
            path: '/oauth2/callback',
            component: AuthHandler
        },
        {
            path: '/',
            component: ImageList
        },
        {
            path: '/upload',
            component: UploadForm
        },
        {
            path: '/search',
            component: CategorizedSearch,
            children: [
                {
                    path: 'testees/:category',
                    component: Testees
                }

            ]
        },
        {
            path: '/me',
            component: Me,
            children: [
                {
                    path: 'how-to',
                    component: HowTo
                },
                {
                    path: 'sign-in',
                    component: Signin,
                    children: [
                        {
                            path: 'sign-up',
                            component: Signup
                        }
                    ]
                },
                {
                    path: 'qrcode',
                    component: QRcode
                },
                {
                    path: 'terms',
                    component: Terms
                }
            ]
        },
        {
            path: '/tasks',
            component: Tasks,
            children: [
                {
                    path: 'new-task',
                    component: NewTask
                }
            ]
        }
    ]
});