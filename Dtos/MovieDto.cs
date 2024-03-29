﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Vidly.Dtos
{
    public class MovieDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        public byte GenreId { get; set; }

        public GenreDto Genre { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public DateTime DateAdded { get; set; } = DateTime.Now;

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Number in stock cannot be negative.")]
        public int NumberInStock { get; set; }

        public int NumberAvailable { get; set; }
    }
}