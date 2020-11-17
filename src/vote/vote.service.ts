import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
import { Training } from "src/training/training.model";
import { VoteDto } from "./dto/vote.dto";
import { votesSchema } from "./schema/vote.schema";
import { Vote } from "./vote.model";

@Injectable()
export class voteService {
  private vote: Vote[] = [];
  private Training: Training[] = [];

  constructor(
    @InjectModel("vote") private readonly voteModel: Model<Vote>,
    @InjectModel("trainings") private readonly trainModel: Model<Training>
  ) {}

}
