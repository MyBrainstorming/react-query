import Mock from 'mockjs';
import fs from 'fs';
import path from 'path';

const Random = Mock.Random;

// 生成标签池
const tags = ['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'Node.js', 
  '前端开发', '后端开发', '全栈开发', '微服务', '云原生', 'DevOps', 
  '性能优化', '用户体验', '响应式设计', '移动开发'];

// 生成模拟数据
const mockData = Mock.mock({
  'users|10-20': [{
    'id|+1': 1,
    name: '@cname',
    email: '@email',
    avatar: '@image("200x200", "@color", "#FFF", "Avatar")',
    'role|1': ['admin', 'user', 'editor'],
    createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
    bio: '@cparagraph(1, 3)'
  }],
  'posts|20-30': [{
    'id|+1': 1,
    title: '@ctitle(10, 20)',
    content: '@cparagraph(10, 20)',
    'authorId|1-10': 1,
    createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
    'tags|1-4': () => Random.shuffle(tags).slice(0, Random.integer(1, 4)),
    'viewCount|100-10000': 100,
    'likeCount|10-200': 10
  }],
  'comments|50-100': [{
    'id|+1': 1,
    'postId|1-20': 1,
    'userId|1-10': 1,
    content: '@cparagraph(1, 3)',
    createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")',
    'likes|0-50': 0
  }]
});

// 确保输出目录存在
const dbDir = path.join(process.cwd(), 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

// 将生成的数据写入文件
fs.writeFileSync(
  path.join(dbDir, 'db.json'),
  JSON.stringify(mockData, null, 2),
  'utf-8'
);

console.log('Mock data has been generated successfully!'); 