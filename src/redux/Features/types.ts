export interface UserProps {
    _id: string;
    name: string;
    favourite: string[];

}
export interface LoginUserInputProps {
    name: string;
    password: string;
}

export interface RegistrationInputProps {
    name?: string;
    password?: string;
    confirmPassword?: string;

}


export interface RegistrationResponseProps {
    message: string;
}

export interface authStateProps {
    userInfo: UserProps | null;
}

export interface resTypeProps {
    userInfo: UserProps;
}

// export interface categoryResTypeProps {
//     _id: string;
//     name: string;
//     description: string;
//     image: string;
//     createdAt: string;
//     updatedAt: string;
// }

// export interface productResTypeProps {
//     _id: string;
//     name: string;
//     description: string;
//     images: [
//         {
//             public_id: string;
//             secure_url: string;
//         }
//     ];
//     seller: string;
//     price: number;
//     isApproved: boolean;
//     category: string;
//     status: 'available' | 'sold' | 'lent' | 'pending';
//     createdAt: string;
//     updatedAt: string;
// }

// export interface paramsProps {
//     keyword: string;
//     page: number;
//     category?: string | null;
//     min?: string | null;
//     max?: string | null;
//     sortBy?: string | null;
// }

// export interface ProductCardProps {
//     products: productResTypeProps[];
//     filteredProductCount: number;
//     resPerPage: number;
// }

// export interface wishlistResType {
//     wishlist: productResTypeProps[];
// }

// export interface updateProfileProps {
//     firstName: string;
//     lastName: string;
//     email: string;
//     username: string;
//     phoneNumber: string;
//     schoolId: string;
// }

// export interface bidProps {
//     _id: string;
//     productId: string;
//     bidderId: string;
//     productName: string;
//     sellerId: string;
//     message: string;
//     amount: number;
//     status: 'pending' | 'accepted' | 'rejected';
//     createdAt: string;
//     updatedAt: string;
// }

// export interface chapaPaymentUrlResProps {
//     success: boolean;
//     data: {
//         data: {
//             checkout_url: string;
//         };
//         message: string;
//         status: string;
//     };
// }

// export interface transactionsProps {
//     type: string;
//     _id: string;
//     productId: string;
//     sellerId: string;
//     customerFirstName: string;
//     customerLastName: string;
//     price: string;
//     customerEmail: string;
//     tx_ref: string;
//     productName: string;
//     status: 'pending' | 'success';
//     balance: string;
//     bits_transaction_charge: string;
//     chapa_transactio_charge: string;
//     created_at: string;
//     currency: string;
//     payment_method: string;
//     reference: string;
//     updated_at: string;
// }
