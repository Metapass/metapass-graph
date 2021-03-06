import { BigInt, store } from "@graphprotocol/graph-ts";
import {
  MetaStorage,
  HostCreated,
  TicketBought,
  childCreated,
  CreateNewFeature,
  linkUpdate,
} from "../generated/MetaStorage/MetaStorage";
import {
  HostCreatedEntity,
  TicketBoughtEntity,
  ChildCreatedEntity,
  FeaturedEntity,
  User,
  UpdatedLink,
} from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";

export function handleHostCreated(event: HostCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = HostCreatedEntity.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new HostCreatedEntity(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count.plus(BigInt.fromI32(1));

  // Entity fields can be set based on event parameters
  entity._hostAddress = event.params._hostAddress.toHexString();
  entity.name = event.params.name;
  entity.image = event.params.image;
  entity.bio = event.params.bio;
  entity.socialLinks = event.params.socialLinks;

  // Entities can be written to the store with `.save()`
  entity.save();
}

export function handleTicketBought(event: TicketBought): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = TicketBoughtEntity.load(
    event.params.childContract.toHexString() +
    "-" +
    event.params.tokenId.toString()
  );

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new TicketBoughtEntity(
      event.params.childContract.toHexString() +
      "-" +
      event.params.tokenId.toString()
    );

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }
  entity.ticketID = event.params.tokenId;
  entity.count = entity.count.plus(BigInt.fromI32(1));
  entity.timestamp = event.block.timestamp

  let user = User.load(event.params.buyer.toHexString());
  if (!user) {
    user = new User(event.params.buyer.toHexString());
  }
  user.save();
  let childcon = ChildCreatedEntity.load(
    event.params.childContract.toHexString()
  );
  log.warning("childcon outside:{}", ["outside"]);
  if (childcon) {
    log.warning("childcon: {}", [childcon.id]);
    entity.childContract = childcon.id;

    if (childcon.ticketsBought.length == 0) {
      let array = new Array<string>();
      array.push(entity.id);
      childcon.ticketsBought = array;
    } else {
      let array = childcon.ticketsBought;
      array.push(entity.id);
      childcon.ticketsBought = array;
    }
    if (childcon.buyers.length == 0) {
      let array = new Array<string>();
      array.push(user.id);
      childcon.buyers = array;
    } else {
      let array = childcon.buyers;
      log.warning("array **: {}", array);
      log.warning("user **: {}", [user.id]);
      array.push(user.id);
      log.warning("array **2: {}", array);
      childcon.buyers = array;
      log.warning("childcon.buyers **: {}", childcon.buyers);
    }
    childcon.save();
    log.warning("childcon user.id: {}", [user.id]);
    log.warning("childcon len of buyers: {}", [
      childcon.buyers.length.toString(),
    ]);
    log.warning("childcon buyers **: {}", childcon.buyers);
  }
  entity.buyer = user.id;
  // // entity.ticketId = en

  entity.save();
}

export function handlechildCreated(event: childCreated): void {
  let entity = ChildCreatedEntity.load(event.params.childAddress.toHexString());
  // let user = User.load();
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand

  // let user = User.load(
  //   eventTwo.params.buyer.toHexString() + "-" + eventTwo.params.childContract
  // );
  if (!entity) {
    entity = new ChildCreatedEntity(event.params.childAddress.toHexString());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // if(user){
  //   entity.buyers.push(user.id);
  entity.count = entity.count.plus(BigInt.fromI32(1));
  entity.venue = event.params.venue;
  entity.title = event.params.title;
  entity.fee = event.params.fee;
  entity.seats = event.params.seats;
  entity.image = event.params.image;
  entity.description = event.params.description;
  entity.eventHost = event.params.eventHost.toHexString();
  entity.link = event.params.link;
  entity.date = event.params.date;
  entity.category = event.params.category;
  entity.buyers = [];
  entity.childAddress = event.params.childAddress.toHexString();

  entity.save();
}

export function handleCreateNewFeature(eventThree: CreateNewFeature): void {
  let entity = FeaturedEntity.load(
    eventThree.params.featuredEventContract.toHexString()
  );
  if (!entity) {
    entity = new FeaturedEntity(
      eventThree.params.featuredEventContract.toHexString()
    );
    let child = ChildCreatedEntity.load(
      eventThree.params.featuredEventContract.toHexString()
    );
    if (child) {
      entity.event = child.id;
    }
    entity.save();
  } else {
    store.remove("FeaturedEntity", entity.id);
  }
}

export function handleUpdateLink(eventFour: linkUpdate): void {
  let entity = UpdatedLink.load(eventFour.params.childContract.toHexString());
  if (!entity) {
    entity = new UpdatedLink(eventFour.params.childContract.toHexString());
  }
  let child = ChildCreatedEntity.load(
    eventFour.params.childContract.toHexString()
  );
  if (child) {
    entity.childContract = child.id;
    child.link = eventFour.params.link;
    child.save();
  }
  entity.link = eventFour.params.link;
  entity.save();
}
