/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null

// Khởi tạo một đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: cái serverApi có từ phiên bản MongoDB 5.0.0 trở lên, có thể ko cần dùng nó, còn nếu dùng nó chúng ta sẽ chỉ định một cái Stable API Version của MongoDB
  // https://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra Database theo tên và gán ngc nó lại vào biến trelloDatabaseInstance ở trên của chúng ta 
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Đóng kết nối tới Database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

// Function GET_DB (ko async) này có nhiệm vụ export ra cái Trello Database Instance sau khi đã connect thành công tói MongoDB để chúng ta sử dụng ở nh` nơi khác nhau trong code
// Lưu ý phải đảm bảo chỉ luôn gọi cái GET_DB nàu sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}
