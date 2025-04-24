import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import Ad from "../entities/Ad";
import { FindManyOptions } from "typeorm";
import Category from "../entities/Category";
import Tag from "../entities/Tag";

@InputType()
class AdInput {
  @Field()
  title: string; // TODO make it required with "!" ?

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  picture: string;

  @Field()
  location: string;

  @Field(() => ID)
  category: Category;

  @Field(() => [ID])
  tags: Tag[];
}

@Resolver(Ad)
export default class AdResolver {
  @Query(() => [Ad])
  async getAllAds() {
    // /ads?category=1 => req.query.category = 1
    let findOptions: FindManyOptions<Ad> = {
      relations: { category: true, tags: true },
    };
    // if (req.query.category !== undefined) {
    //   findOptions = {
    //     ...findOptions,
    //     where: {
    //       category: { id: Number.parseInt(req.query.category as string) },
    //     },
    //   };
    // }
    // if (req.query.search !== undefined) {
    //   console.log("search query", req.query.search);
    //   findOptions = {
    //     ...findOptions,
    //     where: { title: ILike(`%${req.query.search}%`) },
    //   };
    // }
    const allAds = await Ad.find(findOptions);

    return allAds;
  }

  @Mutation(() => Ad)
  async createAd(@Arg("data") data: AdInput) {
    const ad = new Ad();
    ad.title = data.title;
    ad.description = data.description;
    ad.owner = data.owner;
    ad.price = data.price;
    ad.picture = data.picture;
    ad.location = data.location;
    ad.category = data.category;
    // ['1','2'] => [{id:1}, {id:2}]
    //ad.tags = data.tags.map((tag) => ({ id: tag.id }));
    try {
      await ad.save();
      return ad;
    } catch (err) {
      console.warn(err);
      return ad; //TODO Make something more sensible
    }
  }
}
