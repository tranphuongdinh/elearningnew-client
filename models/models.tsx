export interface Course {
    biDanh: string;
    danhMucKhoaHoc: {
        maDanhMucKhoahoc: string;
        tenDanhMucKhoaHoc: string;
    };
    hinhAnh: string;
    luotXem: number;
    maKhoaHoc: string;
    maNhom: string;
    moTa: string;
    ngayTao: string;
    nguoiTao: {
        taiKhoan: string;
        hoTen: string;
        maLoaiNguoiDung: string;
        tenLoaiNguoiDung: string;
    };
    soLuongHocVien: number;
    tenKhoaHoc: string;
    danhGia: number;
}
export interface CourseRegisterInfo {
    maKhoaHoc: string;
    taiKhoan: string;
}
export interface LoginInfo {
    taiKhoan: string;
    matKhau: string;
}
export interface UserVMM {
    taiKhoan: string;
    matKhau: string;
    hoTen: string;
    soDT: string;
    maNhom: string;
    email: string;
}
export interface UserVM {
    taiKhoan: string;
    matKhau: string;
    hoTen: string;
    soDT: string;
    maLoaiNguoiDung: string;
    maNhom: string;
    email: string;
    chiTietKhoaHocGhiDanh: any;
}
export interface AccountVM {
    taiKhoan: string;
}
export interface CourseIdVM {
    maKhoaHoc: string;
}
export interface ButtonSocialProps {
    backgroundColor: string;
}
export interface PaginatorProps {
    currentPage: number;
    count: number;
    totalPages: number;
    totalCount: number;
}

export type CourseProps = {
    course: Course;
    taiKhoan?: string;
    updateUser?: any;
};

export type CoursesProps = {
    currentPage?: number;
    count?: number;
    totalPages?: number;
    totalCount?: number;
    courses?: any;
};

export type CoursesListProps = {
    courses: any;
    title: string;
    currentPage?: number;
    count?: number;
    totalPages?: number;
    totalCount?: number;
    expand?: boolean;
};

export type UserPageProps = {
    user: UserVM;
};

export type InputProps = {
    placeholder: string;
    type: string;
    name: string;
    value: string;
    icon: string;
    onChange: any;
};

export type HeaderProps = {
    user: any;
};

export type ChiTietKhoaHocProps = {
    course: Course;
};