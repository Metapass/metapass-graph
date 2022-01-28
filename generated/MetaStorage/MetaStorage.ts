// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class HostCreated extends ethereum.Event {
  get params(): HostCreated__Params {
    return new HostCreated__Params(this);
  }
}

export class HostCreated__Params {
  _event: HostCreated;

  constructor(event: HostCreated) {
    this._event = event;
  }

  get _hostAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get image(): string {
    return this._event.parameters[2].value.toString();
  }

  get bio(): string {
    return this._event.parameters[3].value.toString();
  }

  get socialLinks(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class TicketBought extends ethereum.Event {
  get params(): TicketBought__Params {
    return new TicketBought__Params(this);
  }
}

export class TicketBought__Params {
  _event: TicketBought;

  constructor(event: TicketBought) {
    this._event = event;
  }

  get childContract(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class childCreated extends ethereum.Event {
  get params(): childCreated__Params {
    return new childCreated__Params(this);
  }
}

export class childCreated__Params {
  _event: childCreated;

  constructor(event: childCreated) {
    this._event = event;
  }

  get title(): string {
    return this._event.parameters[0].value.toString();
  }

  get fee(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get seats(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get image(): string {
    return this._event.parameters[3].value.toString();
  }

  get eventHost(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get description(): string {
    return this._event.parameters[5].value.toString();
  }

  get link(): string {
    return this._event.parameters[6].value.toString();
  }

  get date(): string {
    return this._event.parameters[7].value.toString();
  }

  get childAddress(): Address {
    return this._event.parameters[8].value.toAddress();
  }
}

export class MetaStorage__getEventDetailsResult_EventDataStruct extends ethereum.Tuple {
  get title(): string {
    return this[0].toString();
  }

  get image(): string {
    return this[1].toString();
  }

  get link(): string {
    return this[2].toString();
  }

  get fee(): BigInt {
    return this[3].toBigInt();
  }

  get seats(): BigInt {
    return this[4].toBigInt();
  }

  get occupiedSeats(): BigInt {
    return this[5].toBigInt();
  }

  get date(): string {
    return this[6].toString();
  }

  get childContract(): Address {
    return this[7].toAddress();
  }

  get description(): string {
    return this[8].toString();
  }

  get eventHost(): Address {
    return this[9].toAddress();
  }
}

export class MetaStorage extends ethereum.SmartContract {
  static bind(address: Address): MetaStorage {
    return new MetaStorage("MetaStorage", address);
  }

  getEventDetails(): Array<MetaStorage__getEventDetailsResult_EventDataStruct> {
    let result = super.call(
      "getEventDetails",
      "getEventDetails():((string,string,string,uint256,uint256,uint256,string,address,string,address)[])",
      []
    );

    return result[0].toTupleArray<
      MetaStorage__getEventDetailsResult_EventDataStruct
    >();
  }

  try_getEventDetails(): ethereum.CallResult<
    Array<MetaStorage__getEventDetailsResult_EventDataStruct>
  > {
    let result = super.tryCall(
      "getEventDetails",
      "getEventDetails():((string,string,string,uint256,uint256,uint256,string,address,string,address)[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        MetaStorage__getEventDetailsResult_EventDataStruct
      >()
    );
  }
}

export class AddCreateHostProfileCall extends ethereum.Call {
  get inputs(): AddCreateHostProfileCall__Inputs {
    return new AddCreateHostProfileCall__Inputs(this);
  }

  get outputs(): AddCreateHostProfileCall__Outputs {
    return new AddCreateHostProfileCall__Outputs(this);
  }
}

export class AddCreateHostProfileCall__Inputs {
  _call: AddCreateHostProfileCall;

  constructor(call: AddCreateHostProfileCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _image(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _bio(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _socialLinks(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class AddCreateHostProfileCall__Outputs {
  _call: AddCreateHostProfileCall;

  constructor(call: AddCreateHostProfileCall) {
    this._call = call;
  }
}

export class EmitTicketBuyCall extends ethereum.Call {
  get inputs(): EmitTicketBuyCall__Inputs {
    return new EmitTicketBuyCall__Inputs(this);
  }

  get outputs(): EmitTicketBuyCall__Outputs {
    return new EmitTicketBuyCall__Outputs(this);
  }
}

export class EmitTicketBuyCall__Inputs {
  _call: EmitTicketBuyCall;

  constructor(call: EmitTicketBuyCall) {
    this._call = call;
  }

  get _childContract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class EmitTicketBuyCall__Outputs {
  _call: EmitTicketBuyCall;

  constructor(call: EmitTicketBuyCall) {
    this._call = call;
  }
}

export class PushEventDetailsCall extends ethereum.Call {
  get inputs(): PushEventDetailsCall__Inputs {
    return new PushEventDetailsCall__Inputs(this);
  }

  get outputs(): PushEventDetailsCall__Outputs {
    return new PushEventDetailsCall__Outputs(this);
  }
}

export class PushEventDetailsCall__Inputs {
  _call: PushEventDetailsCall;

  constructor(call: PushEventDetailsCall) {
    this._call = call;
  }

  get title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get fee(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get seats(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get occupiedSeats(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get image(): string {
    return this._call.inputValues[4].value.toString();
  }

  get eventHostAddress(): Address {
    return this._call.inputValues[5].value.toAddress();
  }

  get description(): string {
    return this._call.inputValues[6].value.toString();
  }

  get link(): string {
    return this._call.inputValues[7].value.toString();
  }

  get date(): string {
    return this._call.inputValues[8].value.toString();
  }

  get child(): Address {
    return this._call.inputValues[9].value.toAddress();
  }
}

export class PushEventDetailsCall__Outputs {
  _call: PushEventDetailsCall;

  constructor(call: PushEventDetailsCall) {
    this._call = call;
  }
}