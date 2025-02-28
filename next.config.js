/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  typescript: {
    // !! WARN !!
    // 타입 체크를 건너뛰지만, 프로덕션에서 문제가 발생할 수 있습니다
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 오류 무시
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
