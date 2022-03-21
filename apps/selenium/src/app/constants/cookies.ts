type cookie = {
    domain: string,
    httpOnly: boolean,
    name: string,
    path: string,
    secure: boolean,
    value: string,
    expiry?: number,
    sameSite?: string
}

export const cookies: Array<cookie> = [
    {
        domain: 'editor.wix.com',
        expiry: 1647767361,
        httpOnly: false,
        name: 'fedops.logger.defaultOverrides',
        path: '/',
        secure: false,
        value: '%7B%22paramsOverridesForApp%22%3A%7B%22restaurants-call-center%22%3A%7B%22is_rollout%22%3Atrue%7D%2C%22albums-business-manager.pages.index%22%3A%7B%22is_rollout%22%3Atrue%7D%2C%22albums-business-manager-pages-index%22%3A%7B%22is_rollout%22%3Atrue%7D%2C%22photography-albums-id%22%3A%7B%22is_rollout%22%3Atrue%7D%7D%7D'
    },
    {
        domain: '.wix.com',
        expiry: 1663535298,
        httpOnly: false,
        name: '__utmz',
        path: '/',
        secure: false,
        value: '248670552.1647767298.1.1.utmcsr=users.wix.com|utmccn=(referral)|utmcmd=referral|utmcct=/'
    },
    {
        domain: '.wix.com',
        httpOnly: false,
        name: '__utmc',
        path: '/',
        secure: false,
        value: '248670552'
    },
    {
        domain: '.wix.com',
        expiry: 1710839298,
        httpOnly: false,
        name: '__utma',
        path: '/',
        secure: false,
        value: '248670552.1868259723.1647767283.1647767298.1647767298.1'
    },
    {
        domain: '.wix.com',
        expiry: 1647767898,
        httpOnly: false,
        name: '__utmt',
        path: '/',
        secure: false,
        value: '1'
    },
    {
        domain: '.wix.com',
        expiry: 1710839298,
        httpOnly: false,
        name: '_ga',
        path: '/',
        secure: false,
        value: 'GA1.1.1868259723.1647767283'
    },
    {
        domain: '.wix.com',
        expiry: 1647781701,
        httpOnly: false,
        name: '_wixAB3|6061064e-5a4d-41aa-a946-62647e28678a',
        path: '/',
        secure: false,
        value: '514887#1|496952#2|389304#2|504646#2|361677#1|511089#2|514956#2|515033#2|515108#2|506326#1|493073#1|261000#1|236860#1|351151#1|507435#3|427111#1|493036#2|514888#1|213671#2|504959#1|513114#1|506728#2|513004#1|287210#2|510858#1|495211#2|511301#1|433027#1|97651#1|357145#4|500145#1|500266#2|513132#1|500544#1|509974#2|444216#1|393499#2|514320#1|406591#2|500267#1|492789#1|486999#1|207438#1|506735#1|509454#2|509208#1|434492#1|515031#1|405543#2|401081#1|357146#4|510037#2|493449#2|420971#2|374724#2|495615#2|495555#2|346633#2|199602#1|502525#1|486520#2'
    },
    {
        domain: '.wix.com',
        expiry: 1653556097,
        httpOnly: false,
        name: 'wixClient',
        path: '/',
        sameSite: 'None',
        secure: true,
        value: 'eliyahudayan||VERIFIED_OPT_IN|0|1647767296698|1653556096698|6061064e-5a4d-41aa-a946-62647e28678a|{}|wix'
    },
    {
        domain: '.wix.com',
        expiry: 1655543302,
        httpOnly: false,
        name: '_fbp',
        path: '/',
        sameSite: 'Lax',
        secure: false,
        value: 'fb.1.1647443046610.2073576327'
    },
    {
        domain: '.wix.com',
        expiry: 1647767884,
        httpOnly: false,
        name: '_px3',
        path: '/',
        sameSite: 'Lax',
        secure: false,
        value: 'ca8b44bff92804424ad5b0acafd48eba2d563c43029a8908a856c3e655df728a:VmQv0bHAMkusyn3/UhPn6IQ1LitCKnvE6zBh8+xsd8BHuuIEeHD9SwCe9zERmnx8MtN3LEeEUXRTvBWMTftxzw==:1000:/JymzFQ1pC18TBNn99pM/AYZDPXn0whq/2GsVFPYRcpJNqf6VLlC6npyxx679fjCbqgisKYWCPZe8LKybS5vqPrhY4xA5d+1lEh5zvX0GXA+64NvFzgrBFYpCy+uRMQpY79dCttq6qI/ev/yuSpBJ9xuxJOILivTcFCr9EOmE7BcAOcPZTZ03wUJtyOksDdww/8rjgS0zBsvAQcJj9ej4g=='
    },
    {
        domain: '.wix.com',
        expiry: 1655543281,
        httpOnly: false,
        name: '_wixCIDX',
        path: '/',
        sameSite: 'None',
        secure: true,
        value: '36512089-db45-4369-8e0e-915ccd7dafdf'
    },
    {
        domain: '.wix.com',
        expiry: 1647853698,
        httpOnly: false,
        name: '_gid',
        path: '/',
        secure: false,
        value: 'GA1.2.1339272654.1647767283'
    },
    {
        domain: '.wix.com',
        expiry: 1655543297,
        httpOnly: false,
        name: 'userType',
        path: '/',
        secure: false,
        value: 'REGISTERED'
    },
    {
        domain: '.wix.com',
        expiry: 1805447297,
        httpOnly: false,
        name: 'wixLanguage',
        path: '/',
        sameSite: 'Lax',
        secure: false,
        value: 'en'
    },
    {
        domain: '.wix.com',
        expiry: 1655543297,
        httpOnly: false,
        name: '_wixUIDX',
        path: '/',
        sameSite: 'None',
        secure: true,
        value: '835356861|6061064e-5a4d-41aa-a946-62647e28678a'
    },
    {
        domain: '.wix.com',
        httpOnly: false,
        name: '_wix_browser_sess',
        path: '/',
        secure: false,
        value: 'd703e6c8-7e06-4fe7-bcf6-e8787acef3e4'
    },
    {
        domain: '.wix.com',
        expiry: 1663492102,
        httpOnly: false,
        name: '_wixAB3',
        path: '/',
        secure: false,
        value: '507231#1|446389#2|481367#2'
    },
    {
        domain: '.wix.com',
        httpOnly: false,
        name: 'XSRF-TOKEN',
        path: '/',
        sameSite: 'None',
        secure: true,
        value: '1647767279|-7H1FcWeMFhT'
    },
    {
        domain: '.wix.com',
        expiry: 1655543282,
        httpOnly: false,
        name: '_gcl_au',
        path: '/',
        secure: false,
        value: '1.1.167309338.1647767282'
    },
    {
        domain: '.wix.com',
        expiry: 1653556097,
        httpOnly: true,
        name: 'wixSession2',
        path: '/',
        sameSite: 'None',
        secure: true,
        value: 'JWT.eyJraWQiOiJrdU42YlJQRCIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1widXNlckd1aWRcIjpcIjYwNjEwNjRlLTVhNGQtNDFhYS1hOTQ2LTYyNjQ3ZTI4Njc4YVwiLFwidXNlck5hbWVcIjpcImVsaXlhaHVkYXlhblwiLFwiY29sb3JzXCI6e30sXCJ1Y2RcIjpcIjIwMjItMDMtMTZUMTU6MDQ6MDkuMDAwKzAwMDBcIixcInd4c1wiOmZhbHNlLFwiZXd4ZFwiOmZhbHNlLFwiYW9yXCI6dHJ1ZSxcImFjaVwiOlwiNjA2MTA2NGUtNWE0ZC00MWFhLWE5NDYtNjI2NDdlMjg2NzhhXCIsXCJybWJcIjp0cnVlLFwibHZsZFwiOlwiMjAyMi0wMy0yMFQwOTowODoxNi42NjkrMDAwMFwiLFwibGF0aFwiOlwiMjAyMi0wMy0yMFQwOTowODoxNi42NjkrMDAwMFwiLFwid3hleHBcIjpcIjIwMjItMDQtMDRUMDk6MDg6MTYuNjk2KzAwMDBcIn0iLCJpYXQiOjE2NDc3NjcyOTYsImV4cCI6MTY0OTA2MzI5Nn0.Etzxkbii4nP0dbSOyvFeyIX1MeYzv64uRfp0B4O3ipKfyCYCJpG6lZ6waHyu1FgPw5iqitP6cskEx1y8G6dpc-lUmlf33EkB08WNUlwSTaT-zkbQTFgmLNKxK0XNDQaX1eieWfS6WwdCF5JPTnfvcHiRwz_WA84Wjit4sTKH6KCz6E9zvfpi96ymcXbB6RODhDThky_kwDby95nWc35ERe4o55fIzKqYWiETT7_2H9YfhLtvt5m-a7ZLEtWCOISzUxS4hEloCFjNRx8yZi0Y8XMl9H8-QJbkte6c1fmx82-iRlboiaEMLXV1JQVdRtVGOYlAX71eZkRyJfKxtC2zfQ'
    },
    {
        domain: '.wix.com',
        expiry: 1647769098,
        httpOnly: false,
        name: '__utmb',
        path: '/',
        secure: false,
        value: '248670552.1.10.1647767298'
    },
    {
        domain: '.wix.com',
        expiry: 1679303282,
        httpOnly: false,
        name: '_pxvid',
        path: '/',
        sameSite: 'Lax',
        secure: false,
        value: '3e87799d-a82d-11ec-8c13-524c58484457'
    }
]