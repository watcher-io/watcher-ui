const BASE_URL =
  process.env.NEXT_PUBLIC_API_SERVER || "http://192.168.1.20:8080"

const auth = {
  SIGNIN: `${BASE_URL}/api/v1/auth/login`,
  REGISTER_USER: `${BASE_URL}/api/v1/user/create`,
  CHECK_USER_EXISTENCE: `${BASE_URL}/api/v1/user/exists`,
}

const clusterProfile = {
  FETCH: `${BASE_URL}/api/v1/clusterProfile/fetch`,
  CREATE_PROFILE: `${BASE_URL}/api/v1/clusterProfile/create`,
  CERTIFICATE_UPLOAD: `${BASE_URL}/api/v1/clusterProfile/uploadCertificate`,
}

const dashboard = {
  VIEW: (profileId: string) => `${BASE_URL}/api/v1/dashboard/view/${profileId}`,
}

const keyValue = {
  PUT: (id: string) => `${BASE_URL}/api/v1/kv/put/${id}`,
  GET: (id: string) => `${BASE_URL}/api/v1/kv/get/${id}`,
  DELETE: (id: string) => `${BASE_URL}/api/v1/kv/delete/${id}`,
  COMPACT: (id: string) => `${BASE_URL}/api/v1/kv/compact/${id}`,
}

const maintenance = {
  LIST_ALARM: (id: string) => `${BASE_URL}/api/maintenance/listAlarm/${id}`,
  DEFRAGMENT: (id: string) => `${BASE_URL}/api/maintenance/defragment/${id}`,
  SNAPSHOT: (id: string) => `${BASE_URL}/api/maintenance/snapshot/${id}`,
  MOVE_LEADER: (id: string) => `${BASE_URL}/api/maintenance/moveLeader/${id}`,
}

export { auth, clusterProfile, dashboard, keyValue, maintenance }
