﻿namespace Wowthing.Tool.Models.TransmogSets;

public class DataTransmogSetSet
{
    public bool? Completionist { get; set; }
    public int? Modifier { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Type { get; set; }
    public List<string>? MatchTags { get; set; }
}
