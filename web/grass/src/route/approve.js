import Main from '../component/approve'
import ApproveIndex from '../component/approveIndex.jsx'
import PersonalSettled from '../component/approve/personalSettled'
import OrganizationSettled from '../component/approve/organizationSettled'
import UnChinaOrgainzation from '../component/approve/unChinaOrganizationSettled'

const rootRoutes = [{
  path: '/',
  component: Main,
  indexRoute: {
    component: ApproveIndex
  },
  childRoutes: [{
    path: '/personalSettled',
    component: PersonalSettled
  }, {
    path: '/organizationSettled',
    component: OrganizationSettled
  }, {
    path: '/unChinaOrgainzationSettled',
    component: UnChinaOrgainzation
  }]
}]

export {
  rootRoutes
}