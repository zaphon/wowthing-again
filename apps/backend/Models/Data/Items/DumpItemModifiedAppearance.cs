﻿namespace Wowthing.Backend.Models.Data.Items;

// ReSharper disable InconsistentNaming
public class DumpItemModifiedAppearance
{
    public int ID { get; set; }
    public int ItemID { get; set; }
    public int ItemAppearanceID { get; set; }
    public short ItemAppearanceModifierID { get; set; }
    public short OrderIndex { get; set; }
    public short TransmogSourceTypeEnum { get; set; }
}
