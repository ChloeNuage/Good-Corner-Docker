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
import { FindManyOptions, In, ILike} from "typeorm";
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
  async getAllAds(@Arg("search", { nullable: true }) search?: string) {
  let findOptions: FindManyOptions<Ad> = {
    relations: { category: true, tags: true },
  };

  if (search) {
    findOptions.where = {
      title: ILike(`%${search}%`), // Import ILike de TypeORM
    };
  }

  const allAds = await Ad.find(findOptions);
  return allAds;
}

  @Query(() => Ad)
  async getAd(@Arg("id") id: number) {
    const ad = await Ad.findOneByOrFail({ id });
    return ad;
  }

  @Mutation(() => ID)
  async createAd(@Arg("data") data: AdInput) {
    const ad = Ad.create({
      ...data,
      tags: data.tags.map((tag) => ({ id: Number(tag) })),
    });
    await ad.save();
    return ad.id;
  }

  // Cette version "coûte" deux requêtes, mais renvoie toutes les infos de l'Ad + des entités liées
  // @Mutation(() => Ad)
  // async createAd(@Arg("data") data: AdInput) {
  //   const ad = Ad.create({
  //     ...data,
  //     tags: data.tags.map((tag) => ({ id: Number(tag) })),
  //   });
  //   await ad.save();
  //   return await Ad.findOneBy({ id: ad.id });
  // }

  @Mutation(() => ID)
  async updateAd(@Arg("id") id: number, @Arg("data") data: AdInput) {
    let ad = await Ad.findOneByOrFail({ id });
    ad = Object.assign(ad, data, {
      tags: data.tags.map((tag) => ({ id: Number(tag) })),
    });
    await ad.save();
    return ad.id;
  }

  @Mutation(() => ID)
  async deleteAd(@Arg("id") id: number) {
    await Ad.delete({ id });
    return id;
  }
}
