import Link from "next/link";

export const headerItem1 = [
        {
        key: '1', 
        label: (
          <Link style={{textDecoration: 'none'}} target="_blank" rel="noopener noreferrer" href="/account/login">
            Đăng nhập
          </Link>
        )
      },
      {
        key: '1',
        label: (
          <Link style={{textDecoration: 'none'}} target="_blank" rel="noopener noreferrer" href="/account/register">
            Đăng kí
          </Link>
        )
      },
      {
        key: '1',
        label: (
          <Link style={{textDecoration: 'none'}} target="_blank" rel="noopener noreferrer" href="/account/">
            Liên hệ
          </Link>
        )
      }
]