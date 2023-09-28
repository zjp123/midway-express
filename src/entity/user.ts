import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  public name?: string;

  @prop({ type: () => [String] })
  public jobs?: string[];
}

/*
等价下面这段
const userSchema = new mongoose.Schema({
  name: String,
  jobs: [{ type: String }]
});

const User = mongoose.model('User', userSchema);

*/
