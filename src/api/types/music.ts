
export interface IRequestHotType {
    limit?: number
    cat?: string
    offset?: number
    order?: 'hot' | 'new'
}

export interface IHotType {
    playlists: any[]
}

export interface IRequestSheetList {
    id: number
    limit?: number
    offset?: number
}

export interface ISheetList {
    songs: any[]
}

export interface ISheetDetailBack {
    playlist: {
        coverImgUrl: string
        name: string
        description: string
        tags: any[]
        trackCount: number
    }
}

export interface IVocalist {
    artists: any[]
}
export interface IRequestVocalist {
    limit?: number
    offset?: number
    type?: '-1' | '1' | '2' | '3' // -1 全部 1 男歌手 2 女歌手 3 乐队
    area?: '-1' | '7' | '96' | '8' | '16' | '0' // -1全部 7华语 96欧美 8日本 16韩国 0其他
}

export interface IBoutique {
    playlists: any[]
}
export interface IRequestBoutique {
    limit?: number
    before?: number | undefined
    cat?: string
}

interface H {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
}

interface Al {
    id: number;
    name: string;
    picUrl: string;
    pic_str: string;
    pic: number;
}

interface Ar {
    id: number;
    name: string;
}

interface ChargeInfoList {
    rate: number;
    chargeUrl?: any;
    chargeMessage?: any;
    chargeType: number;
}

interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType?: any;
}

interface Privilege {
    id: number;
    fee: number;
    payed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    toast: boolean;
    flag: number;
    preSell: boolean;
    playMaxbr: number;
    downloadMaxbr: number;
    maxBrLevel: string;
    playMaxBrLevel: string;
    downloadMaxBrLevel: string;
    plLevel: string;
    dlLevel: string;
    flLevel: string;
    rscl?: any;
    freeTrialPrivilege: FreeTrialPrivilege;
    chargeInfoList: ChargeInfoList[];
}

export interface IHotSong {
    rtUrls: any[];
    ar: Ar[];
    al: Al;
    st: number;
    noCopyrightRcmd?: any;
    songJumpInfo?: any;
    rurl?: any;
    pst: number;
    alia: any[];
    pop: number;
    rt: string;
    mst: number;
    cp: number;
    crbt?: any;
    cf: string;
    dt: number;
    rtUrl?: any;
    ftype: number;
    rtype: number;
    cd: string;
    mv: number;
    no: number;
    fee: number;
    djId: number;
    t: number;
    v: number;
    h: H;
    l: H;
    sq: H;
    hr?: any;
    a?: any;
    m: H;
    name: string;
    id: number;
    privilege: Privilege;
}

export interface IArtists {
    img1v1Id: number;
    topicPerson: number;
    trans: string;
    alias: any[];
    picId: number;
    followed: boolean;
    picUrl: string;
    musicSize: number;
    albumSize: number;
    briefDesc: string;
    img1v1Url: string;
    name: string;
    id: number;
    publishTime: number;
    accountId: number;
    picId_str: string;
    img1v1Id_str: string;
    mvSize: number;
}

export interface ISingerList {
    hotSongs: IHotSong[]
    code: number
    more: false
    artist: IArtists
}

export interface IMusicLyric {
    lrc: string
    mill: string
    min: string
    sec: string
    time: number
    active: boolean
}

interface Lrc {
    version: number;
    lyric: string;
}

export interface ILyric {
    sgc: boolean;
    sfy: boolean;
    qfy: boolean;
    lrc: Lrc;
    klyric: Lrc;
    tlyric: Lrc;
    romalrc: Lrc;
    code: number;
}

interface FreeTimeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    type: number;
    remainTime: number;
}

export interface IMusicUrlInfo {
    id: number;
    url: string;
    br: number;
    size: number;
    md5: string;
    code: number;
    expi: number;
    type: string;
    gain: number;
    fee: number;
    uf?: any;
    payed: number;
    flag: number;
    canExtend: boolean;
    freeTrialInfo?: any;
    level: string;
    encodeType: string;
    freeTrialPrivilege: FreeTrialPrivilege;
    freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
    urlSource: number;
    rightSource: number;
    podcastCtrp?: any;
    effectTypes?: any;
    time: number;
}

export interface IGetMusicUrl {
    code: number,
    data: IMusicUrlInfo[]
}

// 歌手详情开始

interface SecondaryExpertIdentiy {
    expertIdentiyId: number;
    expertIdentiyName: string;
    expertIdentiyCount: number;
}
interface Rank {
    rank: number;
    type: number;
}
export interface Artist {
    id: number;
    cover: string;
    name: string;
    transNames: any[];
    identities: any[];
    identifyTag?: any;
    briefDesc: string;
    rank: Rank;
    albumSize: number;
    musicSize: number;
    mvSize: number;
}

interface Identify {
    imageUrl?: any;
    imageDesc: string;
    actionUrl: string;
}

export interface ISingerDetail {
    videoCount: number;
    identify: Identify;
    artist: Artist;
    blacklist: boolean;
    preferShow: number;
    showPriMsg: boolean;
    secondaryExpertIdentiy: SecondaryExpertIdentiy[];
}
